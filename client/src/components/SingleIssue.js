import React, { useEffect, useState } from "react";
import SingleIssueWrapper from "./styles/SingleIssueWrapper";
import Loading from "./Loading";
import Button from "@material-ui/core/Button";

const SingleIssue = props => {
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(null);

  console.log(props);

  useEffect(() => {
    console.log("effect", index, loading);
    if (index !== props.id) {
      setLoading(true);
    }
    setTimeout(() => {
      setLoading(false);
      setIndex(props.id);
    }, 1000);
  }, [index, props.id, loading]);
  if (loading) {
    return (
      <SingleIssueWrapper>
        <div className="issue-container">
          <div style={{ width: "250px", margin: "0 auto" }}>
            <Loading />
          </div>
        </div>
      </SingleIssueWrapper>
    );
  }
  return (
    <SingleIssueWrapper>
      <div className="issue-container">
        <h2>Brooklyn irony organic single-origin coffee meggings</h2>
        <Button
          variant="contained"
          size="medium"
          className="btn"
          color="green"
          type="submit"
        >
          Resolve
        </Button>
        <br />
        <br />
        <hr />
        <div className="issue-info">
          <p>priority: High</p>
          <p>opened: 02/20/2020</p>

          <p>creator: John Doe</p>
        </div>
        <div className="description">
          <p>
            {" "}
            Typewriter cliche crucifix bitters. Hot chicken tofu bespoke, direct
            trade authentic beard fam craft beer yuccie af flannel cardigan
            kinfolk migas. Tumblr scenester kale chips lo-fi biodiesel, woke raw
            denim iceland waistcoat slow-carb. Copper mug poke cold-pressed,
            prism crucifix cray direct trade retro tousled succulents vice
            live-edge paleo bitters.
          </p>
          <p>
            Wolf vegan yr craft beer taiyaki. Cardigan microdosing letterpress,
            twee succulents plaid tilde brunch aesthetic synth. Tofu PBR&B pabst
            meditation tilde. Scenester XOXO health goth, hell of letterpress
            wayfarers four dollar toast tote bag offal normcore forage.
            Helvetica ramps distillery sustainable tilde everyday carry health
            goth. Flannel next level direct trade actually, asymmetrical disrupt
            pork belly enamel pin mustache kickstarter helvetica cronut ugh
            brooklyn.
          </p>
          <p>
            Brooklyn irony organic single-origin coffee meggings. Tote bag hell
            of paleo, cliche meh bitters asymmetrical try-hard etsy ramps.
            Church-key thundercats chambray prism. Drinking vinegar actually
            woke pok pok roof party church-key. +1 venmo kale chips adaptogen,
            retro jianbing pickled. Fingerstache raclette tattooed paleo. Prism
            adaptogen pop-up, microdosing ethical tbh banjo kickstarter vinyl
            messenger bag.
          </p>
        </div>
        <div style={{ textAlign: "center", padding: "1rem" }}>
          <Button
            variant="contained"
            size="large"
            className="btn"
            type="submit"
          >
            More Details
          </Button>
        </div>
      </div>
    </SingleIssueWrapper>
  );
};

export default SingleIssue;
