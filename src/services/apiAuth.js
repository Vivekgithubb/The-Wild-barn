import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function SignUp({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName, avatar: "" } },
  });
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function Login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurentUser() {
  const session = await supabase.auth.getSession();
  if (!session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data?.user;
}

export async function Logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function UpdateCurrentUser({ password, fullName, avatar }) {
  //1 update password or fullName
  let UpdateData;
  if (password) UpdateData = { password };
  if (fullName) UpdateData = { data: { fullName } };
  const { data, error } = await supabase.auth.updateUser(UpdateData);

  if (error) {
    throw new Error(error.message);
  }
  if (!avatar) return data;

  //2upload the avatr image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (uploadError) {
    throw new Error(error.message);
  }

  //3 use avatar to update user with the avatar
  const { data: avatarData, error: errorUpdate } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars//${fileName}`,
      },
    });
  if (errorUpdate) {
    throw new Error(error.message);
  }
  return avatarData;
}
