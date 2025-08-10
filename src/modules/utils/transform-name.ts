export function transformNameOfVegetable(name: string) {
  const arrOfName = name.split(" - ");
  return { name: arrOfName[0], weight: arrOfName[1] };
}
