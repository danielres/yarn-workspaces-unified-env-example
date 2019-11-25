import * as React from "react";
import { useQuery } from "urql";

const css = {
  title: `text-xl`,
  p: `mb-1`
};

const GET_SPACE = /* GraphQL */ `
  query getSpace($shortId: String!) {
    space(shortId: $shortId) {
      id
      shortId
      name
      createdAt
      owner {
        id
        name
        email
      }
      users {
        id
        name
        email
      }
    }
  }
`;

export default ({ shortId }) => {
  const [{ data, error, fetching }, executeQuery] = useQuery({
    query: GET_SPACE,
    variables: { shortId }
  });

  if (!data) return <div>Loading...</div>;
  if (error) return `Something went wrong. Please try again.`;

  const { space } = data;

  return (
    <div>
      <h1 className={css.title}>{space.name}</h1>
      <p className={css.p} title={space.owner.email}>
        owner: {space.owner.name}
      </p>
      <p className={css.p}>
        users:
        <ul>
          {space.users.map(u => (
            <li key={u.id} title={u.email}>
              {u.name}
            </li>
          ))}
        </ul>
      </p>
    </div>
  );
};
