import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='flex flex-col w-full min-h-[80vh] items-center justify-center' style={{
      display:'flex',
      flexDirection:'column',
      width:'100%',
      minHeight:'80vh',
      justifyContent:'center',
      alignItems:'center'
    }}>
      <Link href={'/before-unload'}>Go To Before Unload</Link>
    </div>
  )
}
