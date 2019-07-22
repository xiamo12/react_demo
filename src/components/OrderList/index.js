import React, { Component } from "react";
import OrderItem from "../OrderItem";


class OrderList extends Component{
	constructor(props){
		super(props);
		this.state = {
			data: []
		};
	}
	componentDidMount(){//组件挂载完毕之后执行该函数，把传进来的数据赋予给this.state.data
		fetch("/mock/orders.json").then(res => {
			if(res.ok) {
				res.json().then(data => {
					this.setState({
						data
					})
				})
			}
		})
	}
	render(){
		return (
			<div>
				{
					this.state.data.map((item) => {
						return <OrderItem key={item.id} data={item} onSubmit={this.handleSubmit}/>
					})
				}
			</div>);
	}
	handleSubmit = (id,comment,stars)=>{
		//这一段代码应该在把评论信息成功保存到服务器之后再执行：
		//fetch("/saveComment").then( ()=>{} );相当于在"saveComment"成功之后，在回调函数中去修改

		const newData = this.state.data.map(item => {//遍历state中的每一项数据
			return item.id === id ? {//判断遍历到的这一项是不是我们要找的项，如果是，对订单数据进行修改；不是就还是显示原来的item项
				...item, comment, stars, ifCommented:true,//用扩展运算符返回一个新对象，再将新对象中需要修改的属性comment、stars、ifComment修改掉
			}: item;//对于不是目标项的订单数据，返回原来的数据就可以了。
		});//handleSubmit方法获取到新的订单列表数据
		this.setState({
			data: newData
		})
	}
}

export default OrderList;