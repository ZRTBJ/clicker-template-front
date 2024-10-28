import { useDispatch, useSelector } from 'react-redux';
import SkinsIcon from '../../assets/icons/SkinsIcon';
import StarsIcon from '../../assets/icons/StarsIcon';
import PageTitle from '../../components/PageTitle/PageTitle';
import Button from '../../components/UI/Button/Button';
import { SKINS } from '../../constants/skins.constants';

import s from './SkinsPage.module.scss';
import { setIsBuySkinModal } from '../../store/slices/modalsSlice';
import {
	setBalance,
	setEquipSkin,
	setSkins,
} from '../../store/slices/userSlice';
import { get_invoice_link } from '../../api/get_invoice_link';
import { equip_skin } from '../../api/equip_skin';
import { useState } from 'react';

export default function SkinsPage() {
	const dispatch = useDispatch();
	const { balance, skins, equipSkin,id } = useSelector((state) => state.user);
	const [invoiceLink, setInvoiceLink] = useState('')

	function getEquippedSkinId(skins) {
		for (const skin in skins) {
			if (skins[skin].is_equipped) {
				return skins[skin].id;
			}
		}
		return null; // Если ни один скин не экипирован
	}


	const handleBuy = (skin) => {
		get_invoice_link('', id, skin.titleForApi).then(json=>{
			setInvoiceLink(json.link)
		
				window.Telegram.WebApp.openInvoice(json.link, (data)=>{
				  console.log(data)
				})
		
		})
		/* dispatch(setIsBuySkinModal({ isOpen: true, isSuccess: true }));
		
		dispatch(setIsBuySkinModal({ isOpen: true, isSuccess: false })); */
	};

	const handleEquiped = (elem_id, titleForApi) => {
		equip_skin('', id, titleForApi).then(json=>{
			var equippedSkinId  = getEquippedSkinId(json.skins)
			dispatch(setEquipSkin(equippedSkinId));
		})
		
	};
	

	return (
		<section className={s.skinsPage}>
			<PageTitle
				title={'skins'}
				subtitle={'Buy skins to increase your income'}
			/>
			<div className={s.cards}>
				{SKINS.map((elem, index) => (
					elem.id != 1 &&
					(<div key={index} className={s.card}>
						<div className={s.card__imageWrapper}>
							<img src={elem.img} alt={elem.title} />
						</div>
						<div className={s.card__text}>
							<p className={s.card__title}>{elem.title}</p>
							<p className={s.card__description}>
								+ <SkinsIcon width={10} height={10} /> {elem.bonus}
							</p>
						</div>
						{skins.includes(elem.id) ? (
							<Button
								variant={'white'}
								className={s.card__button}
								onClick={
									equipSkin === elem.id
										? () => {}
										: () => handleEquiped(elem.id, elem.titleForApi)
								}
							>
								{equipSkin === elem.id ? 'Equipped' : 'Equip'}
							</Button>
						) : (
							<Button
								variant={'white'}
								className={s.card__button}
								onClick={() => handleBuy(elem)}
							>
								<StarsIcon />
								{elem.price}
							</Button>
						)}
					</div>)
				))}
			</div>
		</section>
	);
}
