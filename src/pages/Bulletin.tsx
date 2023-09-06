import {createSignal, onMount, Show} from 'solid-js'
import {Card, CardAttr} from "../components/Card.tsx";
import {useParams} from "@solidjs/router";
import {Message} from "../components/Message.tsx";

function Bulletin() {
    const params = useParams();
    const [bulletin, setBulletin] = createSignal({} as CardAttr);
    const [bulExist, setBulExists] = createSignal(false);
    const [loaded, setLoaded] = createSignal(false);
    const [netErr, setNetErr] = createSignal(false);
    const [intErr, setIntErr] = createSignal(false);

    onMount(()=>{
        fetch(`http://localhost:8000/bulletin/${params.id}`, {
            method: 'GET',
            redirect: 'follow'
        })
            .then(
                res => {
                    if(res.ok){
                        res.json().then(result => {
                                // setTimeout(()=>{
                                setBulletin(result);
                                setLoaded(true);
                                if(result){
                                    setBulExists(true);
                                }
                                // }, 2000);
                            }
                        ).catch(err => console.log(err))
                    }else{
                        if(res.status === 500) {
                            setIntErr(true)
                        }else{
                            console.log(res.statusText)
                        }
                    }
                },
                () => {
                    setNetErr(true)
                }
            )
    })
    return (
        <div class={"h-3/4h overflow-y-scroll flex flex-wrap justify-center" + (!bulExist() ? " items-center" : "")}>
            <Show when={bulExist()}>
                <Card limit={-1} id={bulletin().id} head={bulletin().head} description={bulletin().description}/>
            </Show>
            <Message loaded={loaded} netErr={netErr} intErr={intErr} exists={bulExist}/>
        </div>
    )
}

export default Bulletin
