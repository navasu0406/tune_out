const SongItem = ({ name, desc, image, onClick }) => {
  return (
    <div className="flex flex-col cursor-pointer" onClick={onClick}>
      <img className="w-32 h-32 object-cover rounded" src={image} alt={name} />
      <p className="text-white font-semibold">{name}</p>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  );
};

export default SongItem;
