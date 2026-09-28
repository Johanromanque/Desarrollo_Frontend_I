import diablo4 from "../assets/img/diablo4.jpg";
import hades from "../assets/img/hades.jpg";
import helldivers2 from "../assets/img/helldivers2.jpg";
import cyberpunk2077 from "../assets/img/cyberpunk2077.jpg";
import minecraft from "../assets/img/minecraft.jpg";
import silksong from "../assets/img/silksong.jpg";

const juegos = [
  {
    id: 1,
    titulo: "Diablo IV",
    genero: "RPG de acción",
    precioNormal: 49990,
    precioOferta: 39990,
    descripcion:
      "Explora el oscuro mundo de Santuario y enfréntate a poderosos enemigos.",
    imagen: diablo4,
  },
  {
    id: 2,
    titulo: "Hades",
    genero: "Roguelike",
    precioNormal: 19990,
    precioOferta: 15990,
    descripcion:
      "Escapa del inframundo enfrentando enemigos y descubriendo nuevos poderes.",
    imagen: hades,
  },
  {
    id: 3,
    titulo: "Helldivers 2",
    genero: "Acción cooperativa",
    precioNormal: 44990,
    precioOferta: 34990,
    descripcion:
      "Combate junto a otros jugadores para defender la galaxia en intensas misiones.",
    imagen: helldivers2,
  },
  {
    id: 4,
    titulo: "Cyberpunk 2077",
    genero: "RPG",
    precioNormal: 45990,
    precioOferta: 29990,
    descripcion:
      "Explora Night City en una aventura futurista llena de acción y decisiones.",
    imagen: cyberpunk2077,
  },
  {
    id: 5,
    titulo: "Minecraft",
    genero: "Aventura y construcción",
    precioNormal: 29990,
    precioOferta: 24990,
    descripcion:
      "Construye, explora y sobrevive en un mundo compuesto completamente por bloques.",
    imagen: minecraft,
  },
  {
    id: 6,
    titulo: "Hollow Knight: Silksong",
    genero: "Metroidvania",
    precioNormal: 29990,
    precioOferta: 23990,
    descripcion:
      "Explora un nuevo reino lleno de criaturas, desafíos y misterios.",
    imagen: silksong,
  },
];

export default juegos;
