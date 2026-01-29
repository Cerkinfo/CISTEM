// UI from : https://codepen.io/singhimalaya/pen/bxoBZZ

import Connected from "@front/components/bar/Connected";
import { PencilButton } from "@front/components/buttons/PencilButton";
import { Talk, Time } from "@front/components/utils/icons";
import Loading from "@front/components/utils/Loading";
import { useSession } from "@pkg/hooks/ctx";
import { useItem } from "@pkg/hooks/list/getItem";
import "@styles/pages/profile.scss";
import { useParams } from "react-router-dom";

export default function Profile() {
    const { onlineUsers } = useSession();
    const { pseudo } = useParams<{ pseudo: string }>();
    const { item: user, isLoading } = useItem({tableName: 'users', eq: 'pseudo', key: pseudo})

    if (!user && !isLoading) return (
        <main style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
            <h1>404 : User not found</h1>
        </main>
    )

    return (
        <main>
            {isLoading ? 
                <div className="flex justify-center items-center" style={{ margin: '150px' }}>
                    <Loading /> 
                </div>
            : (<>
                <div id="profile-upper">
                    <div id="profile-banner-image">
                    <img src="https://guideetudiant.sbsem.ulb.be/medias/photo/ci_1658229205976-jpg" alt="Banner image" style={{marginTop: '-200px'}}/>
                    </div>
                    <div id="profile-d">
                    <div id="profile-pic">
                        <img src={user?.image}/>
                        <PencilButton action={() => {}}/>
                    </div>
                    <div id="u-name">{user?.first_name} {user?.last_name}</div>
                    </div>
                    <div id="black-grd"></div>
                </div>
                <div id="main-content">
                    <div className="tb">
                    <div className="td" id="l-col">
                        <div className="l-cnt">
                        <div className="cnt-label">
                            <span>@{user?.pseudo}</span>
                            <div className="lb-action"><Connected pseudo={pseudo || ''} /></div>
                        </div>
                        <div id="i-box">
                            <div id="intro-line">Role : {user?.role}</div>
                        </div>
                        </div>
                    </div>
                    <div className="td" id="m-col">
                        <div className="m-mrg" id="p-tabs">
                        <div className="tb">
                            <div className="td">
                            <div className="tb" id="p-tabs-m">
                                <div className="td active">
                                    <div className="material-icons"><Time size={'25'} /></div>
                                    <span>TIMELINE</span>
                                </div>
                                <div className="td">
                                    <div className="material-icons"><Talk size={'25'} /></div>
                                    <span>WHAT'S UP ?</span>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="m-mrg" id="composer">
                        <div id="c-tabs-cvr">
                            <div className="tb" id="c-tabs">
                            <div className="td active"><i className="material-icons">subject</i><span>Make Post</span></div>
                            <div className="td"><i className="material-icons">camera_enhance</i><span>Photo/Video</span></div>
                            <div className="td"><i className="material-icons">videocam</i><span>Live Video</span></div>
                            <div className="td"><i className="material-icons">event</i><span>Life Event</span></div>
                            </div>
                        </div>
                        <div id="c-c-main">
                            <div className="tb">
                            <div className="td" id="p-c-i"><img src="https://singhimalaya.github.io/Codepen/assets/img/others/dp-1.webp" alt="Profile pic"/></div>
                            <div className="td" id="c-inp">
                                <input type="text" placeholder="What's on your mind?"/>
                            </div>
                            </div>
                            <div id="insert_emoji"><i className="material-icons">insert_emoticon</i></div>
                        </div>
                        </div>
                        <div>
                        <div className="post">
                            <div className="tb">
                            <a href="#" className="td p-p-pic"><img src="https://singhimalaya.github.io/Codepen/assets/img/others/dp-2.webp" alt="Rajeev's profile pic"/></a>
                            <div className="td p-r-hdr">
                                <div className="p-u-info">
                                <a href="#">Rajeev Singh</a> shared a memory with <a href="#">Himalaya Singh</a>
                                </div>
                                <div className="p-dt">
                                <i className="material-icons">calendar_today</i>
                                <span>January 28, 2015</span>
                                </div>
                            </div>
                            <div className="td p-opt"><i className="material-icons">keyboard_arrow_down</i></div>
                            </div>
                            <a href="#" className="p-cnt-v">
                            <img src="https://placehold.co/600x600"/>
                            </a>
                            <div>
                            <div className="p-acts">
                                <div className="p-act like"><i className="material-icons">thumb_up_alt</i><span>25</span></div>
                                <div className="p-act comment"><i className="material-icons">comment</i><span>1</span></div>
                                <div className="p-act share"><i className="material-icons">reply</i></div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="td" id="r-col">
                        <div id="chat-bar">
                        <div id="chat-lb"><span>Connected Peoples</span></div>
                        <div id="cts">
                            {onlineUsers.map((onlineUser) => (
                                <div className="on-ct active" key={onlineUser.pseudo}>
                                    <a href="#"><img src={onlineUser.image || ''} alt={onlineUser.pseudo}/></a>
                                </div>
                            ))}
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </>)}
        </main>
    )
}