export function transformNameOfVegetable(name: string, splitter: string) {
  const arrOfName = name.split(splitter);
  return { name: arrOfName[0]?.trim(), weight: arrOfName[1]?.trim() };
}
