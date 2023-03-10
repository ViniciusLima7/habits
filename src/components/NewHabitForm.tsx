import { Check } from "phosphor-react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

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

  async function createNewHabit(event: FormEvent) {
    event.preventDefault();

    if (!title || weekDays.length === 0) {
      alert("Titulo ou recorrência Ausente");
      return;
      // Mostrar Alerta melhoria
    }

    await api.post("habits", {
      title,
      weekDays,
    });

    setTitle("");
    setWeekDays([]);

    alert("Habito Criado com Sucesso");
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemovedOne = weekDays.filter((day) => day !== weekDay);
      setWeekDays(weekDaysWithRemovedOne);
    } else {
      const weekDaysWithAddedOne = [...weekDays, weekDay];
      setWeekDays(weekDaysWithAddedOne);
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
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white palceholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900"
        onChange={(event) => setTitle(event.target.value)}
        value={title}
      />

      <label className="font-semibold leading-tight mt-4">
        Qual a recorrência ?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {avaiableWeekDays.map((weekday, index) => {
          return (
            <Checkbox.Root
              key={weekday}
              className="flex items-center gap-3 group focus:outline-none"
              checked={weekDays.includes(index)}
              onCheckedChange={() => handleToggleWeekDay(index)}
            >
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500  group-data-[state=checked]:border-green-500 transition-colors  group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 group-focus:ring-offset-background">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>
              <span className=" text-white leading-tight">{weekday}</span>
            </Checkbox.Root>
          );
        })}
      </div>

      <button
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
        type="submit"
        // id="title"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}
