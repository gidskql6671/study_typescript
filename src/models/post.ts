import mongoose, { Schema, Model } from "mongoose";


interface IPost {
	title: string;
	content: string;
}