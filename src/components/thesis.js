import { Title, Contributors, PublishDate, Pages, Source } from './formitems';

function Thesis() {
  return <>
    <Title></Title>
    <Contributors author></Contributors>
    <Source></Source>
    <PublishDate type={"thesis"}></PublishDate>
    <Pages></Pages>
  </>
}


export default Thesis;