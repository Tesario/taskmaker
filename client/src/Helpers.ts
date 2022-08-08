import toast, { Toast } from "react-hot-toast";
import Cookie from "js-cookie";

export const graphQLFetch = async (query: string, variables = {}) => {
  try {
    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: Cookie.get("token") || "",
      },
      body: JSON.stringify({ query, variables }),
    });

    const result = await response.json();

    if (result.errors) {
      const error = result.errors[0];

      if (error.extensions.code === "BAD_USER_INPUT") {
        const details = error.extensions.exception.errors.join("\n");
        notify("error", `${error.message} | ${details}`);
      } else {
        notify("error", `${error.extensions.code} | ${error.message}`);
      }
    }

    return result.data;
  } catch (error: any) {
    notify("error", `Error in sending data to server | ${error.message}`);
  }
};

export const timeLeft = (date: Date) => {
  let now: Date = new Date();
  let seconds = (new Date(date).getTime() - now.getTime()) / 1000;
  let state = "left";
  if (seconds <= 0) {
    state = "ago";
    seconds *= -1;
  }

  if (seconds < 59) {
    return `${Math.floor(seconds)} seconds ${state}`;
  }
  let minutes = seconds / 60;
  if (minutes < 59) {
    return `${Math.floor(minutes)} minutes ${state}`;
  }
  let hours = minutes / 60;
  if (hours < 24) {
    return `${Math.floor(hours)} hours ${state}`;
  }
  let days = hours / 24;
  if (days < 30) {
    return `${Math.floor(days)} days ${state}`;
  }
  let months = days / 30;
  return `${Math.floor(months)} months ${state}`;
};

export const notify = (type: "success" | "error", text: string) => {
  const opts:
    | Partial<
        Pick<
          Toast,
          | "id"
          | "icon"
          | "duration"
          | "ariaProps"
          | "className"
          | "style"
          | "position"
          | "iconTheme"
        >
      >
    | undefined = {
    duration: 4000,
    position: "bottom-right",
  };

  switch (type) {
    case "success":
      toast.success(text, opts);
      break;
    case "error":
      toast.error(text, opts);
      break;
  }
};
