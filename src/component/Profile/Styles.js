import Theme from  '../../theme'
const Style = {
  btnStyle: {
    bgcolor: Theme.palette.primary.main,
    "&:hover": { bgcolor: Theme.palette.secondary.main },
    width: 160,
    height: 40,
    borderRadius: "6px",
    textTransform: "none",
    boxShadow: "none",  
  },
  infoStyle: {
    display: "flex",
    alignItems: "center",
    color: "#723d46",
    marginTop: 2,
  },
  BoxStyle: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: 5,
  },
  cardStyle: {
    width: 450,
    p: 3,
    boxShadow: "none",
    borderRadius: 2,
  },
  mainStyle: {
    height: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
export default Style;