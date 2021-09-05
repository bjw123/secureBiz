// We need to tell TypeScript that when we write "import styles from './styles.scss' we mean to load a module (to look for a './styles.scss.d.ts'). 
declare module '*.scss'; 

declare namespace JSX {
    interface IntrinsicElements {
        [tagName:string]: any
    }
}
declare module 'react-dynamic-swiper'
declare module 'swagger-client'
declare module 'fetch'