import supabase from "./supabase";

const supabaseUrl = "https://kwetpmhemedhdffnfcij.supabase.co";

export async function getCabin() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Couldnt load cabins");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Couldnt Delete cabins");
  }
  return data;
}

export default async function newEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const URL = hasImagePath
    ? newCabin.image
    : `https://kwetpmhemedhdffnfcij.supabase.co/storage/v1/object/public/cabins//${imageName}`;

  let query = supabase.from("cabins");

  //create
  if (!id) query = query.insert([{ ...newCabin, image: URL }]);
  //edit
  if (id)
    query = query
      .update([{ ...newCabin, image: URL }])
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();
  if (error) {
    console.log(error);
    throw new Error("Couldnt Create cabin");
  }

  // 2. upload image to storage
  console.log(newCabin);
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, newCabin.image);

  // 3. delete cabin if there was an upload error
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(error);
    throw new Error("Couldnt Create cabin due to Image");
  }
  return data;
}
