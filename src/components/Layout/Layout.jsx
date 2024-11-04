import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  setIsBuySkinModal,
  setIsConnectWalletModal,
  setIsTapBotModal,
} from "../../store/slices/modalsSlice";
import Header from "../Header";
import Footer from "../Footer/Footer";
import TapBotModal from "../../components/modals/TapBotModal";
import { BGLIST, socket } from "../../constants/bg.constant";
import { getIndex } from "../../utils/getIndexBg";

import s from "./Layout.module.scss";
import BuySkinModal from "../modals/BuySkinModal/BuySkinModal";
import Qr from "../Qr/Qr";
import { useEffect, useState } from "react";
import ConnectWalletModal from "../modals/ConnectWalletModal/ConnectWalletModal";
import Loader from "../Loader/Loader";
import { authorise } from "../../api/authorise";
import { get_users_friends } from "../../api/getUsersFriends";
import { setFriends, setUsers } from "../../store/slices/usersSlice";
import {
  setBoostersLevels,
  setCompletedTasks,
  setEquipSkin,
  setInitialUser,
  setRefillsMadeForDay,
} from "../../store/slices/userSlice";
import { get_tasks } from "../../api/get_tasks";
import { getSquads } from "../../api/getSquads";
import { getUsers } from "../../api/getUsers";
import { setTasks } from "../../store/slices/tasksSlice";
import { setSquads } from "../../store/slices/squadsSlice";
import Logo from "../../assets/images/logo.svg";
import List from "../../assets/images/list.svg";

export default function Layout() {
  const { invitcode } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isDeviceCheck, setDeviceCheck] = useState(true);
  const [isAuthWasMade, setIsAuthWasMade] = useState(false);
  const [isShowMain, setIsShowMain] = useState(false);
  const { pathname } = useLocation();
  const { id } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { isBuySkinModal, isConnectWalletModal, isTapBotModal } = useSelector(
    (state) => state.modals
  );

  function getEquippedSkinId(skins) {
    for (const skin in skins) {
      if (skins[skin].is_equipped) {
        return skins[skin].id;
      }
    }
    return null; // Если ни один скин не экипирован
  }

  function getBoughtSkins(skins) {
    const boughtSkins = [0];
    for (const skin in skins) {
      if (skins[skin].is_bought) {
        boughtSkins.push(skins[skin].id);
      }
    }
    return boughtSkins;
  }

  useEffect(() => {
    if (user.id == 0) {
      navigate("/");
    }
  });

  useEffect(() => {
    if (id == 0 && !isAuthWasMade) {
      setIsAuthWasMade(true);
      authorise("", invitcode).then((json) => {
        var coinsClicked = 0;
        if (json.coins_clicked) {
          coinsClicked = json.coins_clicked;
        }
        get_users_friends("", json.id).then((json) => {
          dispatch(setFriends(json.result));
        });

        var equippedSkinId = getEquippedSkinId(json.skins);
        if (!equippedSkinId) {
          equippedSkinId = 1;
        }
        dispatch(setCompletedTasks(json.completed_tasks));
        const boughtSkins = getBoughtSkins(json.skins);

        dispatch(
          setInitialUser({
            id: json.id,
            energy: json.energy,
            maxEnergy: json.max_energy,
            multitap: json.coins_per_click,
            balance: json.coins,
            nickname: json.name,

            skins: boughtSkins,
            equipSkin: equippedSkinId,
            squad: json.in_squad,
            photoUrl: json.photo_url,
            tgId: json.telegram_id,
            coinsClicked: coinsClicked,
          })
        );
        socket.send(
          JSON.stringify({
            eventname: "pong",
            userId: json.id,
          })
        );

        dispatch(setEquipSkin(equippedSkinId));
        console.log([json.refills_made_for_day, "json.refills_made_for_day"]);
        if (json.refills_made_for_day != undefined) {
          dispatch(setRefillsMadeForDay(json.refills_made_for_day));
        }

        if (json.coins_clicked) {
          dispatch(setIsTapBotModal(true));
        }

        dispatch(
          setBoostersLevels({
            multitaplevel: json.boosters.multitap.times_was_bought,
            maxenergylevel: json.boosters.maxenergy.times_was_bought,
            tapbotlevel: json.boosters.tapbot.times_was_bought,
          })
        );
      });

      get_tasks().then((json) => {
        dispatch(setTasks(json.result));
      });
      getSquads("").then((json) => {
        dispatch(setSquads(json.result));
      });
      getUsers("").then((json) => {
        dispatch(setUsers(json.result));
      });
    }
  }, [dispatch, id, invitcode, isAuthWasMade]);

  const handleClose = () => {
    dispatch(setIsBuySkinModal({ isOpen: false, isSuccess: false }));
  };

  const index = getIndex(pathname);

  const platform = window.Telegram.WebApp.platform;

  useEffect(() => {
    switch (platform) {
      case "android":
      case "ios":
        setDeviceCheck(true);
        break;

      default:
        setDeviceCheck(false);
        return;
    }
  }, [platform]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading)
    return (
      <div className="loaderWrapper">
        <Loader />
      </div>
    );

  if (!isDeviceCheck) {
    return (
      <div
        className={s.layout}
        style={{
          backgroundImage: `url(${BGLIST[index]})`,
          justifyContent: "center",
        }}
      >
        <img src={Logo} style={{ width: "200px", alignSelf: "center" }}></img>
        <Qr />
      </div>
    );
  }

  return (
    <div
      className={s.layout}
      style={{
        backgroundImage: `url(${BGLIST[index]})`,
      }}
    >
      {isShowMain ? (
        <>
          <Header />
          <main className={s.main}>
            <Outlet />
          </main>
          <Footer />
          <div className={s.bottomBlur} />
          <BuySkinModal
            isOpen={isBuySkinModal.isOpen}
            isSuccess={isBuySkinModal.isSuccess}
            onClose={handleClose}
          />
          <ConnectWalletModal
            isOpen={isConnectWalletModal}
            onCLose={() => dispatch(setIsConnectWalletModal(false))}
          />
          <TapBotModal
            isOpen={isTapBotModal}
            onClose={() => dispatch(setIsTapBotModal(false))}
          />
        </>
      ) : (
        <div className={s.splash}>
          <h1 className={s.title}>
            TAP<span className={s.highlight}>2</span>EARN
          </h1>
          <p className={s.subtitle}>TEMPLATE</p>
          <img className={s.logo} src={Logo}></img>
          <img src={List} className={s.list} />
          <button
            className={s.playbtn}
            onClick={() => {
              setIsShowMain(true);
            }}
          >
            play now
          </button>
        </div>
      )}
    </div>
  );
}
