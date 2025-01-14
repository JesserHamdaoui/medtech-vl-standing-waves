export const createDiv = (id: string, text: string) => {
  let div = document.getElementById(id);
  if (!div) {
    div = document.createElement("div");
    div.id = id;
    document.body.appendChild(div);
  }
  div.innerText = text;
  return div;
};

export const createButton = (id: string, text: string, onClick: () => void) => {
  let button = document.getElementById(id);
  if (!button) {
    button = document.createElement("button");
    button.id = id;
    button.innerText = text;
    button.onclick = onClick;
    document.body.appendChild(button);
    console.log(button);
  }
};
