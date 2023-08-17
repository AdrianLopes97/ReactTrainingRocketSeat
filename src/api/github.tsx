
export type GitHubUser = {
  name: string;
  avatar:string;
}

type GitHubGetUserParam = {
  username: string;
}

type profileResponse = {
  name: string;
  avatar_url:string;
}

export async function getUserByUserName(props: GitHubGetUserParam) : Promise<GitHubUser> {
  const response = await fetch("https://api.github.com/users/" + props.username);
  const data = await response.json() as profileResponse;
  console.log("DADOS =>", data);

  const result: GitHubUser = {
    name: data.name,
    avatar: data.avatar_url,
  }

  return result;
}