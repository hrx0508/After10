import Modal from '../../components/ui/Modal.jsx';
import Button from '../../components/ui/Button.jsx';
import { useFin } from '../../store/index.js';
import { inr } from '../../engine/format.js';
export default function SettingsModal({ onClose }) {
    const { pace, setPace, reset, say } = useFin();
    return <Modal open onClose={onClose} title="Settings"><p className="text-sm text-white/65">Your daily spending pace drives every forecast.</p><p className="mt-3 text-3xl font-bold">{inr(pace)}<span className="text-sm font-normal text-white/50"> / day</span></p>
        <input type="range" min={40} max={400} step={5} value={pace} onChange={e => setPace(+e.target.value)} aria-label="Daily pace" className="my-3" />
        <Button variant="danger" className="mt-3 w-full" onClick={() => { reset(); say('Demo data restored.'); onClose() }}>Reset demo data</Button></Modal>
}
