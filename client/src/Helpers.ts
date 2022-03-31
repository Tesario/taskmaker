export const graphQLFetch = async (query: string, variables = {}) => {
  try {
    const response = await fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });

    const result = await response.json();

    if (result.errors) {
      const error = result.errors[0];

      if (error.extensions.code === "BAD_USER_INPUT") {
        const details = error.extensions.exception.errors.join("\n");
        alert(`${error.message}: ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }

    return result.data;
  } catch (error: any) {
    alert(`Error in sending data to server: ${error.message}`);
  }
};
