// Using crypto.randomUUID() instead of uuid package
import { randomUUID } from 'crypto';
const uuidv4 = randomUUID;

export interface Producto {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    categoria_id: string | null;
    imagen_url: string;
    destacado: boolean;
}

export const productos: Producto[] = [
    {
        id: uuidv4(),
        nombre: "Aceite esencial de Clavo",
        descripcion: "El aceite esencial de clavo es conocido por sus increíbles propiedades antimicrobianas, antimicóticas, antisépticas, antivirales, afrodisíacas y estimulantes. Perfecto para utilizar en tus mezclas de Cosmética Natural, añadiendo unas cuantas gotas en tu crema corporal o aceite vegetal, conseguirás nutrir y lucir una piel radiante y 100% cuidad.",
        precio: 7.99,
        stock: 100,
        categoria_id: null,
        imagen_url: "/sources/1.jpg",
        destacado: false
    },
    {
        id: uuidv4(),
        nombre: "Parches de Oro de 24 kt Rejuvenecedores para Contorno de Ojos",
        descripcion: "Parches de oro de 24 kt rejuvenecedores para contorno de ojos de Natura Siberica. Parches para ojos con efecto rejuvenecedor enriquecidos con oro de 24kt. Su acción descongestiona la piel, la suaviza y mejora su luminosidad.",
        precio: 15.50,
        stock: 100,
        categoria_id: null,
        imagen_url: "/sources/2.jpg",
        destacado: true
    },
    {
        id: uuidv4(),
        nombre: "Parches Iluminadores para el Contorno de Ojos",
        descripcion: "Parches iluminadores para el contorno de ojos de Natura Siberica. 60 Parches para ojos con efecto iluminador que hidratan la piel del contorno, le devuelven la vitalidad y mejoran su protección para mantenerla joven.",
        precio: 15.50,
        stock: 100,
        categoria_id: null,
        imagen_url: "/sources/3.jpg",
        destacado: false
    },
    {
        id: uuidv4(),
        nombre: "Parches Supertonificantes para Contorno de Ojos",
        descripcion: "Parches supertonificantes para contorno de ojos de Natura siberica. Parches para ojos con efecto tonificante que reducen visiblemente los signos de fatiga en la mirada y le aportan luz y vitalidad al instante.",
        precio: 15.50,
        stock: 100,
        categoria_id: null,
        imagen_url: "/sources/4.jpg",
        destacado: false
    },
    {
        id: uuidv4(),
        nombre: "6 Discos Desmaquillantes de Fibra Natural",
        descripcion: "Eliminan el maquillaje y limpian el rostro con suavidad. Elaborados en algodón y carbón de bambú. De doble cara y función.",
        precio: 10.50,
        stock: 100,
        categoria_id: null,
        imagen_url: "/sources/5.jpg",
        destacado: false
    },
    {
        id: uuidv4(),
        nombre: "Aceite anticelulítico de abedul",
        descripcion: "El extracto de hojas de abedul contiene flavonoides y tanines, los cuales sirven para mantener y conservar el metabolismo y circulación de los líquidos en el cuerpo.",
        precio: 22.90,
        stock: 100,
        categoria_id: null,
        imagen_url: "/sources/6.jpg",
        destacado: false
    },
    {
        id: uuidv4(),
        nombre: "Aceite antiinflamatorio S.O.S Rescate",
        descripcion: "Pequeñas heridas, quemaduras, golpes, cicatrices… ¿Cuántos productos diferentes estás usando para paliar estos accidentes?",
        precio: 12.45,
        stock: 100,
        categoria_id: null,
        imagen_url: "/sources/7.jpg",
        destacado: false
    },
    {
        id: uuidv4(),
        nombre: "Aceite Bucal de Coco Orgánico Premium",
        descripcion: "Oil Pulling de Dr. Goerg. El aceite bucal de coco orgánico premium de Dr. Goerg es fácil de usar y, gracias a sus ingredientes 100 % naturales.",
        precio: 9.60,
        stock: 100,
        categoria_id: null,
        imagen_url: "/sources/8.jpg",
        destacado: false
    },
    {
        id: uuidv4(),
        nombre: "Aceite corporal blanco siberiano anticelulítico",
        descripcion: "Este producto te trae lo mejor para el cuidado de tu cuerpo gracias a las propiedades de la cera blanca de abeja, los aceites naturales y la schizandra.",
        precio: 6.95,
        stock: 100,
        categoria_id: null,
        imagen_url: "/sources/9.jpg",
        destacado: false
    },
    {
        id: uuidv4(),
        nombre: "Aceite corporal Body Sculptor",
        descripcion: "Aceite corporal que moldea el cuerpo y esculpe la silueta de forma natural y eficaz. Previene el exceso de peso y la retención de líquidos.",
        precio: 73.70,
        stock: 100,
        categoria_id: null,
        imagen_url: "/sources/10.jpg",
        destacado: true
    },
    {
        id: uuidv4(),
        nombre: "Aceite corporal de almendras dulces",
        descripcion: "El Aceite de Almendras dulces es básico para una hidratación y nutrición de la piel. Puedes utilizarlo en todas las partes de tu cuerpo.",
        precio: 10.45,
        stock: 100,
        categoria_id: null,
        imagen_url: "/sources/11.jpg",
        destacado: false
    },
    {
        id: uuidv4(),
        nombre: "Aceite corporal de almendras dulces con dosificador 1L",
        descripcion: "El Aceite de Almendras dulces es básico para una hidratación y nutrición de la piel. Puedes utilizarlo en todas las partes de tu cuerpo.",
        precio: 14.99,
        stock: 100,
        categoria_id: null,
        imagen_url: "/sources/12.jpg",
        destacado: false
    },
    {
        id: uuidv4(),
        nombre: "Aceite corporal de almendras dulces con dosificador 500ml",
        descripcion: "El Aceite de Almendras dulces es básico para una hidratación y nutrición de la piel. Puedes utilizarlo en todas las partes de tu cuerpo.",
        precio: 11.55,
        stock: 100,
        categoria_id: null,
        imagen_url: "/sources/13.jpg",
        destacado: false
    },
    {
        id: uuidv4(),
        nombre: "Aceite Corporal de Granada",
        descripcion: "El aceite corporal de granada es de acción antioxidante intensiva que sirve para la regeneración celula, reafirmando y mejorando la elasticidad.",
        precio: 22.90,
        stock: 100,
        categoria_id: null,
        imagen_url: "/sources/14.jpg",
        destacado: false
    },
    {
        id: uuidv4(),
        nombre: "Aceite Corporal de Rosa Mosqueta",
        descripcion: "La principal acción de la Rosa Mosqueta es la regeneración de la piel y elasticidad, aportando tonicidad a la piel.",
        precio: 22.90,
        stock: 100,
        categoria_id: null,
        imagen_url: "/sources/15.jpg",
        destacado: false
    },
    {
        id: uuidv4(),
        nombre: "Aceite corporal Embellecedor del Busto",
        descripcion: "Aceite corporal empleado para moldear y realzar el busto dándole una apariencia de mayor volumen.",
        precio: 81.70,
        stock: 100,
        categoria_id: null,
        imagen_url: "/sources/16.jpg",
        destacado: true
    },
    {
        id: uuidv4(),
        nombre: "Aceite corporal Reafirmante de Tejidos",
        descripcion: "Aceite corporal indispensable para prevenir la pérdida de firmeza de los tejidos y reafirmar las zonas que presentan flacidez.",
        precio: 60.00,
        stock: 100,
        categoria_id: null,
        imagen_url: "/sources/17.jpg",
        destacado: false
    },
    {
        id: uuidv4(),
        nombre: "Aceite corporal Reafirmante del Busto",
        descripcion: "Aceite corporal específico de tratamiento que reafirma eficazmente el seno caído a la vez que hidrata y suaviza la piel devolviéndole su belleza.",
        precio: 81.70,
        stock: 100,
        categoria_id: null,
        imagen_url: "/sources/18.jpg",
        destacado: false
    },
    {
        id: uuidv4(),
        nombre: "Aceite corporal Reina de Egipto",
        descripcion: "Aceite corporal de exótica fragancia que nutre en profundidad, combate el envejecimiento cutáneo, regenera y alisa.",
        precio: 57.30,
        stock: 100,
        categoria_id: null,
        imagen_url: "/sources/19.jpg",
        destacado: false
    },
    {
        id: uuidv4(),
        nombre: "Aceite daúrico corporal de Natura Siberica",
        descripcion: "Relaja tu cuerpo con este fantástico producto con el que podrás disfrutar de momentos únicos. Aceite daúrico corporal es perfecto para pieles secas.",
        precio: 18.95,
        stock: 100,
        categoria_id: null,
        imagen_url: "/sources/20.jpg",
        destacado: false
    },
    {
        id: uuidv4(),
        nombre: "Aceite de Aguacate corporal",
        descripcion: "El aceite de aguacate actúa un bálsamo perfecto para la piel. Destaca por su efecto nutritivo, protector y regenerante.",
        precio: 15.00,
        stock: 100,
        categoria_id: null,
        imagen_url: "/sources/21.jpg",
        destacado: false
    },
    {
        id: uuidv4(),
        nombre: "Aceite de almendras corporal Bio",
        descripcion: "Hidrata y nutre tu piel con este aceite de almendras ecológico de primera prensada en frío.",
        precio: 14.95,
        stock: 100,
        categoria_id: null,
        imagen_url: "/sources/22.jpg",
        destacado: false
    },
    {
        id: uuidv4(),
        nombre: "Aceite de Argán Bio 30ML",
        descripcion: "Este aceite vegetal rico en vitaminas y antioxidantes te hará lucir una piel radiante.",
        precio: 12.99,
        stock: 100,
        categoria_id: null,
        imagen_url: "/sources/23.jpg",
        destacado: false
    },
    {
        id: uuidv4(),
        nombre: "Aceite de Argán Bio 100ML",
        descripcion: "Este aceite vegetal rico en vitaminas y antioxidantes te hará lucir una piel radiante.",
        precio: 25.95,
        stock: 100,
        categoria_id: null,
        imagen_url: "/sources/24.jpg",
        destacado: false
    },
    {
        id: uuidv4(),
        nombre: "Aceite de CBD 5%",
        descripcion: "Aceite de semillas de cáñamo con CBD al 5%. Adecuado para el uso diario en personas con dolor crónico o de intensidad alta.",
        precio: 20.95,
        stock: 100,
        categoria_id: null,
        imagen_url: "/sources/25.jpg",
        destacado: false
    }
];