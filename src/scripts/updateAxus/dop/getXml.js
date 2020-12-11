import bent from "bent";

export const getXmlAxus = async () =>{
  // return fs.readFileSync('/var/www/api/src/axus_all_dropprice.xml').toString();
  const url = "https://axus.com.ua/axus_all_dropprice.xml";
  return await bent(url, "string", "GET", 200)();
}