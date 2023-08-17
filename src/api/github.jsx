
export async function getUserByUserName(props){
  const response = await fetch("https://api.github.com/users/" + props.username);
  const data = await response.json();
  console.log("DADOS =>", data);

  return {
    name: data.name,
    avatar: data.avatar_url,
  };
}