import { generateDateFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { HabitDay } from "./HabitDay";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const weekDaysEn = ["S", "M", "T", "W", "T", "F", "S"];

const summaryDates = generateDateFromYearBeginning();
const minimumSummaryDatesSize = 18 * 7; //18 Semanas
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;
console.log(summaryDates);

export function SummaryTable() {
  return (
    <div className="w-full flex ">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((day, index) => {
          return (
            <div
              key={index}
              className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center"
            >
              {day}
            </div>
          );
        })}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map((date, index) => {
          return <HabitDay key={index} />;
        })}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, index) => {
            return (
              <div
                key={index}
                className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40  cursor-not-allowed"
              ></div>
            );
          })}
      </div>
    </div>
  );
}