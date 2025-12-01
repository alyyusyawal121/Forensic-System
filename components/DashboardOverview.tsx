export default function DashboardOverview() {
  const stats = [
    { 
      title: "Cases Investigated", 
      describe: "Hi there i am Investigated! efwwwwccccwewwwwcw" 
    },
  ];

  return (
    <div className="w-full">
      {stats.map((item, index) => (
        <div 
          key={index} 
          className="bg-white p-6 rounded-xl shadow w-full"
        >
          <div className="font-bold text-3xl">
            {item.title}
          </div>

          <p className="mt-3 text-gray-600 text-justify">
            {item.describe}
          </p>
        </div>
      ))}
    </div>
  );
}
