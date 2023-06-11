import Questions from "../components/FAQ/questions";
import useData from "../components/FAQ/Data";

const FAQ = () => {
  const Data = useData()

  return (
    <div className="faq">
      <h2>FAQ</h2>
        <section>
          {Data.map(data => <Questions key={data.q} {...data} />)}
        </section>
    </div>
  )
};
export default FAQ;