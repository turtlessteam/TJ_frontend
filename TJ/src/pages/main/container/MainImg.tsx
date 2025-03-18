interface songProps {
  img: string;
}

const Song = ({ img }: songProps) => {
  return (
    <div className="rounded-4xl justify-end pr-6">
      <img className="w-14 h-14 rounded-4xl" src={img}></img>
    </div>
  );
};

export default Song;
