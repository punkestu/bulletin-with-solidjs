import {createSignal, For, onMount, Show} from 'solid-js'
import {Card, CardAttr} from "../components/Card.tsx";
import {Message} from "../components/Message.tsx";
import {createStore} from "solid-js/store";

interface Form {
  head: string;
  description: string;
}

function Bulletins() {
  const [bulletins, setBulletins] = createSignal([] as CardAttr[]);
  const [bulExist, setBulExists] = createSignal(false);
  const [loaded, setLoaded] = createSignal(false);
  const [netErr, setNetErr] = createSignal(false);
  const [intErr, setIntErr] = createSignal(false);

  const [fields, setFields] = createStore({} as Form);
  const createBulletin = ()=> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch("http://localhost:8000/bulletin", {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        head: fields.head,
        description: fields.description,
      }),
      redirect: 'follow'
    })
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
  }
  onMount(()=>{
      fetch("http://localhost:8000/bulletin", {
        method: 'GET',
        redirect: 'follow'
      })
          .then(
              res => {
                if(res.ok){
                  res.json().then(result => {
                      // setTimeout(()=>{
                        setBulletins(result);
                        setLoaded(true);
                        if(result.length > 0){
                          setBulExists(true);
                        }
                      // }, 2000);
                    }
                  )
                }else{
                  if(res.status === 500) {
                    setIntErr(true)
                  }
                }
              },
              () => {
                setNetErr(true)
              }
          )
  })
  return (
    <>
      <div class={"h-3/4h overflow-y-scroll flex flex-wrap justify-center" + (!bulExist() ? " items-center" : "")}>
        <Show when={bulExist()}>
          <For each={bulletins()}>
            {
              bulletin => <Card limit={100} id={bulletin.id} head={bulletin.head} description={bulletin.description}/>
            }
          </For>
        </Show>
        <Message loaded={loaded} netErr={netErr} intErr={intErr} exists={bulExist}/>
      </div>
      <form class={"bg-blue-950 flex flex-col gap-2 p-2 h-1/4h border-t-4"} onsubmit={createBulletin}>
        <input type="text" name="head" onInput={
          (e)=> {
            setFields("head", e.target.value)
          }
        } class={"p-1 rounded-sm"} placeholder="Header" required/>
        <textarea name="description" rows="5" onInput={
          (e)=> {
            setFields("description", e.target.value)
          }
        } class={"p-1 rounded-sm"} placeholder="Description" required></textarea>
        <button type="submit" class={"py-1 bg-gray-50 hover:bg-gray-300 text-blue-950 rounded-md"}>Buat</button>
      </form>
    </>
  )
}

export default Bulletins
