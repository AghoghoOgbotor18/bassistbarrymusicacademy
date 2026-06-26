import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsappLink() {
    return (
        <div className='fixed right-4 bottom-5 flex justify-center items-center bg-green-700 rounded-full w-15 h-15 animate-pulse z-1000'>
            <a href="https://wa.me/2349077268160" target='_blank'><FaWhatsapp size={35} className='text-white'/></a>
        </div>
    )
}



