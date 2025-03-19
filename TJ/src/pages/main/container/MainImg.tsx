interface songProps {
  img: string;
}

const Song = ({ img }: songProps) => {
  return (
    <div className="rounded-4xl justify-end pr-6">
      <img className="w-20 h-20 rounded-2xl" src={img}></img>
    </div>
  );
};

export default Song;
