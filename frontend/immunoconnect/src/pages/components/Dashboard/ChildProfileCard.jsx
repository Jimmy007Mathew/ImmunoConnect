import { Baby, Calendar, User, Syringe } from "lucide-react";

const ChildProfileCard = ({ child, onSelect }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onSelect}
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-blue-100 p-2 rounded-full">
          <Baby className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{child.name}</h3>
      </div>
      <div className="space-y-3 text-gray-600">
        <p className="flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
          DOB: {new Date(child.dateOfBirth).toLocaleDateString()}
        </p>
        <p className="flex items-center">
          <User className="h-4 w-4 mr-2 text-gray-400" />
          Gender: {child.gender}
        </p>
        <div className="flex items-center">
          <Syringe className="h-4 w-4 mr-2 text-gray-400" />
          Vaccinations:{" "}
          {child.vaccinations.filter((v) => v.status === "administered").length}
          /{child.vaccinations.length} completed
        </div>
      </div>
    </div>
  );
};
export default ChildProfileCard;
