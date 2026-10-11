import { Smartphone, Bus, Home, Wifi, Music2, Tv, Play, ShoppingBag, Wrench, Briefcase, Gift, Receipt, Heart, Clock, Tag, Package } from 'lucide-react';
const M = { smartphone: Smartphone, bus: Bus, home: Home, wifi: Wifi, music: Music2, tv: Tv, play: Play, bag: ShoppingBag, wrench: Wrench, briefcase: Briefcase, gift: Gift, receipt: Receipt, heart: Heart, clock: Clock, tag: Tag };
export const Icon = ({ name, ...p }) => { const C = M[name] || Package; return <C {...p} /> };
