import  { Component } from "react";  // Ensure both React and Component are imported


class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("Error occurred:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Error occurred while rendering this component.</div>;
    }

    return this.props.children;  // Only re-render if there is an error
  }
}

export default ErrorBoundary;
