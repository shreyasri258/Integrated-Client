// Card component for displaying submission information
function ExamReportCard({ name, email,score, malpractices }) {
    let nameColor="bg-yellow-400";
    let cardColor = "bg-yellow-200";
    if (malpractices >= 7) {
      cardColor = "bg-red-200";
      nameColor="bg-red-400";
    } else if (malpractices === 0) {
      cardColor = "bg-green-200";
      nameColor="bg-green-400";
    }
  
    return (
      <div className={`shadow-md rounded p-4 w-72 h-48 border ${cardColor}`}>
        <h2 className={`font-bold ${nameColor} text-center rounded text-lg`}>{name}</h2>
        {/* <h2 className={`font-bold ${nameColor} text-center rounded text-lg`}>{email}</h2> */}
        <div className="mt-5">
          <p>Score: {score}</p>
          <p className="mt-2">Malpractices: {malpractices}</p>
          <p className="mt-2">Email : {email}</p>
        
        </div>
      </div>
    );
  }
  
  export default ExamReportCard;