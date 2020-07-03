import React from 'react';
import './App.css';
import TodoTitle from './component/todotitle';
import Todocontent from './component/todocontent';

class App extends React.Component {
  constructor(){
    super();
    this.completedContent = [];
    this.clickedTitle = '미정1';
    this.state = {
      plan: 
      [{title: '미정1' , content: ['테스트입니다.','테스트입니다.','테스트입니다.','테스트입니다.','테스트입니다.']}, 
      {title: '미정2' , content: ['테스트입니다.2','테스트입니다.2','테스트입니다.2','테스트입니다.2','테스트입니다.2']}],
    }
    this.contentArray = this.state.plan[0].content;
  }

  findContent(clickedTitle){
    for(var i = 0; i < this.state.plan.length; i++){
      if(this.state.plan[i].title === clickedTitle){
        return this.state.plan[i].content;
      }
    }
    return;
  }

  changeContent(event){
    this.clickedTitle = event.target.innerHTML
    this.contentArray = this.findContent(this.clickedTitle);
    this.setState({});
  }

  addPlan(newTitle){
    this.setState({
      plan: this.state.plan.concat({title: newTitle, content:[]})
    })
  }

  addContent(text){
    var newPlan = this.state.plan;
    for(var i = 0; i < newPlan.length; i++){
      if(newPlan[i].title === this.clickedTitle){
        var newObj = {title: this.clickedTitle, content: newPlan[i].content}
        newObj.content.push(text);
        delete newPlan[i];
      }
    }
    for(var j = 0; j < newPlan.length; j++){
      if(typeof newPlan[j] === 'undefined'){
        newPlan[j] = newObj;
      }
    }
    this.setState({
      plan: newPlan
    })
  }

  deleteContent(text){
    this.completedContent.push(text);
    var newPlan = this.state.plan;
    for(var i = 0; i < newPlan.length; i++){
      if(newPlan[i].title === this.clickedTitle){
        var newObj = {title: this.clickedTitle, content: newPlan[i].content}
        newObj.content.splice(newObj.content.indexOf(text), 1);
      }
    }
    this.setState({
      plan: newPlan
    })
  }

  renderContent(){
    if(this.clickedTitle !== '완료된 일정'){
      return (
        this.contentArray.map((contents) => {
          return <Todocontent eachContent={contents} deleteContent={this.deleteContent} />
        })
      )
    }
    else{
      return(
        this.completedContent.map((contents) => {
          return <Todocontent eachContent={contents} />
        })
      )
    }
  }

  search(event){
    this.clickedTitle = event.target.value
    this.contentArray = this.findContent(this.clickedTitle);
    if(this.contentArray !== undefined){
      this.setState({});
    }
  }

  goToCompleted(){
    this.clickedTitle = '완료된 일정';
    this.setState({});
  }

  componentDidUpdate(){
    console.log(this.state, this.clickedTitle)
  }


  render(){
    this.changeContent = this.changeContent.bind(this);
    this.findContent = this.findContent.bind(this);
    this.addPlan = this.addPlan.bind(this);
    this.addContent = this.addContent.bind(this);
    this.deleteContent = this.deleteContent.bind(this);
    this.goToCompleted = this.goToCompleted.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.search = this.search.bind(this);
    var inputValue = "";
    var inputContent = "";
    

    return (
      <div className="around">
        <div className="sidenav">
          <div className="sidenav-content">
            <div className="searchbar">
            {<i class="fas fa-search"></i>}
            <input className="input1" onChange={
              function(event){
                this.search(event)
              }.bind(this)
            }></input>
            </div>
          <div className="completeplan" onClick={
              this.goToCompleted
          }>{<i class="far fa-smile-wink"></i>}완료된 일정</div>
          <div className="plan">
          <div><i class="far fa-clock fa-spin"></i>예정된 일정</div>
          <div className="addedplan">
          {this.state.plan.map((eachPlan) => {
            return <TodoTitle title={eachPlan.title} changeContent={this.changeContent}/>
          })}
          </div>
          </div>
          <div className="addplan">
          <div className="add"><i class="fas fa-plus-circle"></i>일정 추가</div>
          <input className="input2" onChange={
            (event) => {
              inputValue = event.target.value;
            }
          } onKeyDown={
            function(event){
              if(event.keyCode === 13){
                var newTitle = inputValue
                this.addPlan(newTitle)
                event.target.value = "";
              }
            }.bind(this)
          }></input>
          <button className="button" onClick={
            function(){ 
              var newTitle = inputValue
              this.addPlan(newTitle)}.bind(this)
              }>추가</button>
          </div>
          </div>
        </div>
  
        <div className="content">
          <input className="input3" onChange={
            (event) => {
              inputContent = event.target.value;
            }
          }
          onKeyDown={
            function(event){
              if(event.keyCode === 13){
                var newContent = inputContent;
                this.addContent(newContent)
                event.target.value = "";
              }
            }.bind(this)
          }></input>
          <button className="contentbtn" onClick={
            function(){
              var newContent = inputContent;
              this.addContent(newContent)
            }.bind(this)
          }>추가</button>
          { this.renderContent() }
        </div>
      </div>
    );
  }
  
}

export default App;
