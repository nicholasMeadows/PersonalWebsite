import NavigationBarGithubImg from "@/app/navigation-bar-github-img";
import NavigationBarLinkedinImg from "@/app/navigation-bar-linkedin-img";

const NavigationBar: React.FC = () => {
    return <div style={{
        background: 'white',
        height: '5em',
        maxHeight: '5em',
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
    }}>

        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'row'
        }}>
            <div style={{
                borderLeft: '6px solid gray',
                height: '100%'
            }}></div>
            <div style={{
                color: 'black',
                marginLeft: '1em',
                marginRight: '1em',
                alignContent: 'center'
            }}>
                <strong style={{fontSize: '1.5em',}}>Home</strong>
            </div>


            <div style={{
                borderLeft: '6px solid gray',
                height: '100%'
            }}></div>


            <div style={{
                color: 'black',
                marginLeft: '1em',
                marginRight: '1em',
                alignContent: 'center'
            }}>
                <strong style={{fontSize: '1.5em',}}>Work Experience</strong>
            </div>
            <div style={{
                borderLeft: '6px solid gray',
                height: '100%'
            }}></div>
            <div style={{
                color: 'black',
                marginLeft: '1em',
                marginRight: '1em',
                alignContent: 'center'
            }}>
                <strong style={{fontSize: '1.5em',}}>About Me</strong>
            </div>
            <div style={{
                borderLeft: '6px solid gray',
                height: '100%'
            }}></div>
        </div>

        <div style={{
            display: 'flex',
            flexWrap: 'nowrap',
            marginLeft: 'auto',
            marginRight: '0.5em',
            height: '100%',
            overflow: 'hidden',
            padding: '1em'
        }}>
            <NavigationBarGithubImg/>
            <NavigationBarLinkedinImg/>
        </div>
    </div>;
}
export default NavigationBar;