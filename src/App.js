import { useEffect } from 'react';
import { disconnectSocket, initiateSocketConnection, myCustomEvent, subscribeToChat } from './socket.service';
function App() {
  useEffect(() => {
    initiateSocketConnection();
    // Socket event 
    subscribeToChat((err, data) => {
      console.log(data);
    });
    return () => {
      disconnectSocket()
    }
  }, [])
  return (
    <div>
      <button onClick={() => {
        myCustomEvent((err, data) => {
          console.log(data);
        })
      }}>Click</button>
    </div>
  );
}

export default App;
