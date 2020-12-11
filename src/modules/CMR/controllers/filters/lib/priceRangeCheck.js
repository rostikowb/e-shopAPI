
export const priceRangeCheck = (allPrc, curPrc) =>{

  if(curPrc < allPrc.gte) allPrc.gte = curPrc;
  if(curPrc > allPrc.lte) allPrc.lte = curPrc;

  return allPrc;
}