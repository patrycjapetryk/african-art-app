import Image from 'next/image';

export default function OfflinePage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center p-6'>
      <h1 className='text-3xl mb-4 '>Brak połączenia</h1>
      <p className='mb-6'>
        Wygląda na to, że jesteś offline. Sprawdź połączenie i spróbuj ponownie.
      </p>
      <Image
        src='/fallback.png'
        alt='Offline'
        width={200}
        height={200}
        priority
        className='rounded-lg shadow-md'
      />
    </div>
  );
}
