import React from "react";
import { Edit2, CheckCircle } from "lucide-react";

const PlanCard = ({
  name,
  price,
  durationInDays,
  features,
  accentColor,
  icon: Icon,
  onEdit  //here we have added on edit as we will apply this from the parent container on this props 
}) => {
  return (
    <div
      className="w-[280px] min-h-[520px] rounded-3xl p-6 flex flex-col justify-between
      border backdrop-blur-lg"
      style={{
        borderColor: accentColor,
        boxShadow: `0 0 20px ${accentColor}30`,
      }}
    >
      {/* Top Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-2xl font-semibold">
            {name}
          </h2>

          <div
            className="p-3 rounded-xl"
            style={{
              backgroundColor: `${accentColor}25`,
            }}
          >
            <Icon
              size={22}
              color={accentColor}
            />
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-white text-5xl font-bold">
            ₹{price}
          </h1>

          <span className="text-gray-400">
            /{durationInDays} days
          </span>
        </div>

        <hr className="border-gray-700 mb-6" />

        <div className="flex flex-col gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3"
            >
              <CheckCircle
                size={18}
                color={accentColor}
              />

              <span className="text-gray-300">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div>
        <hr className="border-gray-700 my-6" />

        <div className="flex justify-between items-center">
          <p className="text-gray-400">
             Members
          </p>

          <button
            onClick={()=>onEdit()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer"
            style={{
              borderColor: accentColor,
              color: accentColor,
            }}
          >
            <Edit2 size={16} />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;