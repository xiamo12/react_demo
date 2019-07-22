import React, { Component } from "react";
import "./style.css";


class OrderItem extends Component{
	constructor(props){
		super(props);
		this.state = {
			editing:false,
			stars: props.data.stars || 0,
			comment: props.data.comment || "",
			ifCommented:false,
			description: ""
		}
	}
	render(){
		const { shop, product, price, picture, ifCommented } = this.props.data;
		return <div className="orderItem">
		<div className="orderItem__picContainer">
			<img className="orderItem__pic" src={picture} alt=""/>
		</div>{/*图片容器*/}

		<div className="orderItem__content">
			<div className="orderItem__product">{product}</div>{/*产品名称*/}
			<div className="orderItem__shop">{shop}</div>{/*店铺名称*/}
			<div className="orderItem__detail">
				<div className="orderItem__price">{price}</div>
				<div>
					{
						ifCommented?(<button className="orderItem__btn orderItem__btn--grey">已评价</button>):
						(<button className="orderItem__btn orderItem__btn--red" onClick={this.handerOrderEditArea}>评价</button>)}
				</div>
			</div>{/*产品细节容器*/}
		</div>{/*产品信息容器*/}
		{this.state.editing ? this.renderEditArea() : null}
		</div>
	}
	renderEditArea(){
		return (
			<div className="OrderItem__commentContainer">
				<textarea className="OrderItem__comment" onChange={this.handerCommentChange} value={this.state.comment}/>
				{this.renderStars()}
				<p>{ this.state.description }</p>
				<button className="orderItem__submit" onClick={this.handleSubmitCommet}>提交</button>
				<button className="orderItem__cancel" onClick={this.handleCancelComment}>取消</button>
			</div>
			)
	}
	renderStars(){
		const { stars } =this.state;
		return (
			<div>{
				[1,2,3,4,5].map( (item,index)=>{
					const lightClass = stars >= item ? "orderItem__star--light":"";
					return (<span key={index} onClick={this.handerClickStars.bind(this,item)} className={"orderItem__star "+lightClass}>★</span>);
			})
		}
		</div>
		)
	}

	handerOrderEditArea = ()=>{
		this.setState({
			editing: true,
		});
	}

	handerCommentChange = (e)=>{
		this.setState({
			comment: e.target.value
		})
	}
	handerClickStars = (stars)=>{
		this.setState({
			stars: stars
		});
	}

	handleCancelComment = () => {
		this.setState({
			editing:false,
			stars: this.props.data.stars || 0,
			comment: this.props.data.comment || ""
		})
	}
	handleSubmitCommet = () => {
		const { id } = this.props.data;
		const { comment, stars } = this.state;
		if(comment){
			if(stars){
				this.setState({
					editing: false,
				});
				this.props.onSubmit(id, comment, stars);
			}else{
				alert("您还没给星星呢！")
			}
		}else{
			alert("请输入评价内容")
		}
	}
}

export default OrderItem;