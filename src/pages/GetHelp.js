import { Link } from "react-router-dom";
import Resource from "../components/GetHelp/Resource";

const GetHelp = () => {
    const data = [
        {
            h3: 'Domestic Violence and Victim Support Unit (DOVVSU)',
            p: 'DOVVSU is a specialized unit of the Ghana Police Service that focuses on addressing domestic violence and providing support to victims. They offer counseling, legal advice, and assistance with filing reports.',
            links: "Visit the <a href='https://www.google.com.gh/maps/search/police+station'>nearest police station</a> or call <a href='tel:18555'>18555</a>"
        },
        {
            h3: 'Human Trafficking Secretariat (HTS)',
            p: 'HTS works to combat human trafficking and provides support services to victims. They collaborate with various organizations to offer shelter, counseling, medical care, and reintegration assistance.',
            links: "Visit their website <a href='https://www.hts.gov.gh/'>HERE</a> or call <a href='tel:+0302662822'>0 302 662822</a>"
        },
        {
            h3: 'Department of Social Welfare',
            p: 'The Department of Social Welfare provides social support services to vulnerable individuals, including victims of abuse and violence. They offer counseling, referral services, and assistance with basic needs.',
            links: `Contact your local <a href='https://www.google.com.gh/maps/search/ghana+department+of+social+welfare/'>Department of Social Welfare</a> or visit <a href='http://www.mospd.gov.gh/'>HERE</a>`
        },
        {
            h3: 'Gender-Based Violence Response Unit (GBVRU)',
            p: 'GBVRU is an initiative of the Ministry of Gender, Children, and Social Protection that provides support and services to survivors of gender-based violence. They offer counseling, legal aid, medical care, and shelter.',
            links: "Visit their website <a href='http://www.mogcsp.gov.gh/'>HERE</a> or call <a href='tel:0800111222'>0800111222</a>"
        },
        {
            h3: 'Domestic Violence Coalition',
            p: 'The Domestic Violence Coalition is a network of organizations working together to combat domestic violence. They provide support services, including counseling and legal aid, and can refer victims to appropriate resources.',
            links: "Visit their website<a href='https://www.dvcghana.org/'>HERE</a> or call <a href='tel:0244272211'>0 244 272 211</a>"
        },
        {
            h3: 'Mental Health Authority',
            p: 'The Mental Health Authority of Ghana can provide assistance for individuals who have experienced trauma or are in need of mental health support. They can refer victims to appropriate mental health services and professionals.',
            links: "Visit their website <a href='https://www.mha.gov.gh/'>HERE</a> or call <a href='tel:0302666023'>0 302 666023</a>"
        }
    ]
  return (
    <div id="gethelp" className="gethelp">
        <h2>Get help</h2>
        <div>
            <Link to='vms/create-report'>Create Report</Link>
            <Link to='vms'>Your reports</Link>
        </div>
        <div>
            <h2>Who you can call</h2>

            <ul>
                {data.map(res => <Resource key={res.h3} {...res} />)}
            </ul>
        </div>
    </div>
  )
};
export default GetHelp;