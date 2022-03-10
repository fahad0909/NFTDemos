import Web3 from "web3";
import {useState} from "react";
import config from '../config.json';

const pricePerNFT = 0.02;

export default function Home() {
    const [account, setAccount] = useState(null);
    const [counter, setCounter] = useState(1);
    const [contract, setContract] = useState(null);
    const [web3, setWeb3] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const connectWallet = async () => {
        if (window.ethereum) {
            const _web3 = new Web3(window.ethereum);
            setWeb3(_web3);
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                const networkId = await window.ethereum.request({
                    method: "net_version",
                });
                const NetworkData = await config.networks[networkId];
                if (networkId == 4) {
                    const SmartContractObj = new _web3.eth.Contract(
                        config.abi,
                        config.address
                    );
                    // dispatch(
                    //     connectSuccess({
                    //         account: accounts[0],
                    //         smartContract: SmartContractObj,
                    //         web3: web3,
                    //     })
                    // );
                    setAccount(accounts[0]);
                    setContract(SmartContractObj);

                    // Add listeners
                    window.ethereum.on("accountsChanged", (accounts) => {
                        setAccount(accounts[0]);
                    });
                    window.ethereum.on("chainChanged", () => {
                        window.location.reload();
                    });
                } else {
                    setError("Change network to ETH");
                }
            } catch (err) {
                console.log(err);
                setError("Something went wrong.");
            }
        } else {
            setError("Install Metamask.");
        }
    }

    const mintNFTs = () => {
        if (counter <= 0) {
            console.log(counter);
            return;
        }
        setLoading('minting');
        setMessage("Minting...");
        contract.methods
            .mint(account, counter)
            .send({
                gasLimit: "285000",
                from: account,
                value: web3.utils.toWei((pricePerNFT * counter).toString(), "ether"),
            })
            .once("error", (err) => {
                console.log(err);
                setMessage(null);
                setError("Something went wrong, please try again later.");
                setLoading(null);
            })
            .then((receipt) => {
                console.log(receipt);
                setMessage(
                    "Congratulations on your new NFT. Go visit <a href='https://testnets.opensea.io/collection/fahad-abc' target='_blank'>OpenSea</a> to view it."
                );
                setLoading(null);
            });
    };

    return (
        <>
            <header>
                <div className="container">
                    <div className="header__wrap" data-animation="fadeInDown" data-duration="700">
                        <div className="brand-logo">
                            <a href="/">
                                <img src="assets/svg/brand-logo.svg" width="99" height="68" alt="ZNK Games Logo"/>
                            </a>
                        </div>
                        <div className="navigation">
                            <ul>
                                <li>
                                    {
                                        account ? <div className="alert alert-secondary" role="alert">
                                                {account}
                                            </div> :
                                            <button className="btn btn-dark" type="button"
                                                    onClick={() => {
                                                        connectWallet().then(r => {
                                                        });
                                                    }}>
                                                CONNECT WALLET
                                            </button>
                                    }
                                </li>
                            </ul>
                        </div>
                        <div className="toogle-wrap">
                            <div className="toggle-menu"><a
                                href="javascript:"><span></span><span></span><span></span><span></span></a></div>
                        </div>
                    </div>
                </div>
            </header>

            <main>
                <section className="hero--section d-flex justify-content-center" id="introduction">
                    <div>
                        <div className="text-center mb-3">
                            <h4 className="mb-2">NFT Minting</h4>
                            <div className="d-flex justify-content-between align-items-center text-dark">
                                <div>
                                    <h5 className="mb-1">Supply</h5>
                                    <p className="small">100</p>
                                </div>
                                <div>
                                    <h5 className="mb-0">Price</h5>
                                    <p>0.02 ETH</p>
                                </div>
                                <div>
                                    <h5 className="mb-0">Max</h5>
                                    <p>20 per Wallet</p>
                                </div>
                            </div>
                        </div>
                        <div className="card custom-card p-5">
                            <div className="card-body text-center">
                                <h2 className="mb-3">Limited Sale</h2>
                                {
                                    message &&
                                    <div className="alert alert-info" role="alert" dangerouslySetInnerHTML={{ __html: message }}>
                                        {/*{message}*/}
                                    </div>
                                }
                                {
                                    error &&
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                }
                                <div
                                    className="border rounded p-3 d-flex justify-content-between align-items-center mb-3">
                                    <img src="https://via.placeholder.com/150" alt="NFT" className="rounded"
                                         style={{maxHeight: '100px', width: 'auto'}}/>
                                    <div>
                                        <p className="small mb-0">Price per NFT</p>
                                        <h5 className="mb-0">0.02 ETH</h5>
                                    </div>
                                </div>

                                <div
                                    className="border rounded p-3 d-flex justify-content-between align-items-center bg-light-gradient">
                                    <div className="input-group" style={{maxWidth: '110px'}}>
                                        <div className="input-group-prepend">
                                            <button disabled={counter === 1} className="btn btn-outline-light"
                                                    type="button"
                                                    onClick={() => counter > 0 && setCounter((counter - 1))}>
                                                -
                                            </button>
                                        </div>
                                        <input disabled type="number" className="form-control" value={counter} min={1}
                                               max={20}/>
                                        <div className="input-group-append">
                                            <button disabled={counter === 20} className="btn btn-outline-light"
                                                    type="button"
                                                    onClick={() => counter < 20 && setCounter(counter + 1)}>
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <button disabled={counter === 20} className="btn btn-light" type="button"
                                            onClick={() => counter !== 20 && setCounter(20)}>
                                        SET MAX
                                    </button>
                                </div>
                                <hr className="bg-white"/>
                                <div className="py-1 d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0 fw-light">Total</h5>
                                    <h5 className="mb-0">{pricePerNFT * counter} ETH</h5>
                                </div>
                                <hr className="bg-white"/>
                                <button disabled={loading === 'minting' || !account} className="btn btn-light"
                                        type="button"
                                        onClick={mintNFTs}>
                                    MINT
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}