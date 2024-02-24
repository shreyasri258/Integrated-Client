function Badge({ children, type }) {
  if (type === "accept") {
    return (
      <span className="bg-green-200 cursor-default uppercase text-sm font-semibold p-2 rounded-md text-green-700">
        {children}
      </span>
    );
  }

  if (type === "reject") {
    return (
      <span className="bg-slate-300 uppercase text-sm font-semibold p-2 tracking-wider rounded-md text-slate-800 border-1 border-slate-200">
        {children}
      </span>
    );
  }
}

export default Badge;
