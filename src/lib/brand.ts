export const BASE = import.meta.env.BASE_URL
export const img = (name: string) => `${BASE}images/${name}`

export const PHONE_DISPLAY = '059 420 4056'
export const PHONE_INTL = '970594204056' // Palestine +970, number from the Instagram bio
export const MAPS_URL = 'https://maps.app.goo.gl/aM6NPpPcV4xzP1277'
export const INSTAGRAM_URL = 'https://www.instagram.com/olivecoffee.ps/'

// TODO: Olive's own page in the delivery app. Every "Order" button uses this one link.
// Get it from the shop (or the app's Share button on their page) and paste it here.
export const ORDER_URL = 'https://yummy.ps/'
export const ORDER_APP = 'Yummy'

export const waLink = (text: string) => `https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(text)}`

// Open from 8:00 until 2:00 the next morning, every day.
export function isOpenNow(d = new Date()) {
  const h = d.getHours()
  return h >= 8 || h < 2
}
