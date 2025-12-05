import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-product',
  imports: [NgIf],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product implements OnInit{
  trabajador: any = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get(`http://localhost:5000/store/product/${id}`).subscribe((res: any) => {
      this.trabajador = res.trabajador;
    });
  }
}
