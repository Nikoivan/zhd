import emailUrl from './contacts-icons/email.svg';
import phoneUrl from './contacts-icons/phone.svg';
import skypeUrl from './contacts-icons/skype.svg';
import locationUrl from './contacts-icons/location.svg';
import youTubeUrl from './socials-icons/youtube.svg';
import linkenInUrl from './socials-icons/linkedln.svg';
import googleUrl from './socials-icons/google.svg';
import facebookUrl from './socials-icons/facebook.svg';
import twitterUrl from './socials-icons/twitter.svg';

const contactsData = {
	contactsList: [
		{ title: 'tel', value: '8 (800) 000 00 00', icon: phoneUrl },
		{
			title: 'mailto',
			value: 'inbox@mail.ru',
			icon: emailUrl,
		},
		{
			title: 'skype',
			value: 'tu.train.tickets',
			icon: skypeUrl,
			url: 'https://join.skype.com/jBs5RDCdEY1JPp',
		},
		{
			title: 'address',
			value: ['г. Москва', 'ул. Московская 27-35', '555 555'],
			icon: locationUrl,
			url: 'yandexnavi://build_route_on_map?lat_to=59.918423&lon_to=30.347444',
		},
	],
	socialNetworks: [
		{
			title: 'youTube',
			value: 'https://www.youtube.com/watch?v=7wMwop0YuLc',
			icon: youTubeUrl,
		},
		{ title: 'linkedln', value: 'https://vk.com', icon: linkenInUrl },
		{ title: 'google', value: 'inbox@gmail.com', icon: googleUrl },
		{ title: 'faceBook', value: 'https://vk.com', icon: facebookUrl },
		{ title: 'twitter', value: 'https://vk.com', icon: twitterUrl },
	],
};

export default contactsData;
