import { Check } from "phosphor-react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { FormEvent, useState } from "react";

const avaiableWeekDays = [
  "Domingo",
  "Segunda-Feira",
  "Terça-Feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
  "Sábado",
];

export function NewHabitForm() {
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  function createNewHabit(event: FormEvent) {
    event.preventDefault();
    console.log(title, weekDays);
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemoveOne = weekDays.filter((day) => day !== weekDay);

      setWeekDays(weekDaysWithRemoveOne);
    } else {
      const weekDaysWithAddOne = { ...weekDays, weekDay };

      setWeekDays(weekDaysWithAddOne);
    }
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label className="font-semibold leading-tight" htmlFor="title">
        Qual seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        placeholder="Ex: Dormir bem, Excericios"
        autoFocus
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white palceholder:text-zinc-400"
        onChange={(event) => setTitle(event.target.value)}
      />

      <label className="font-semibold leading-tight mt-4">
        Qual a recorrência ?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {avaiableWeekDays.map((weekday, index) => {
          return (
            <Checkbox.Root
              onCheckedChange={() => handleToggleWeekDay(index)}
              key={weekday}
              className="flex items-center gap-3 group"
            >
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500  group-data-[state=checked]:border-green-500">
                <Checkbox.Indicator className="">
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>
              <span className=" text-white leading-tight">{weekday}</span>
            </Checkbox.Root>
          );
        })}
      </div>

      <button
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500"
        type="submit"
        // id="title"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}
