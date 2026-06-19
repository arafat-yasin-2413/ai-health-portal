import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { ArrowRight, ShieldAlert } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function AdminPortalCard() {
  return (
    <Card className="flex flex-col justify-between border-slate-200 shadow-sm bg-white hover:border-amber-200 transition-all">
                <CardHeader>
                    <div className="p-2.5 w-fit bg-amber-50 rounded-lg mb-2 text-amber-600">
                        <ShieldAlert className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900">
                        Admin Console
                    </CardTitle>
                    <CardDescription className="text-slate-500 pt-1 text-sm leading-relaxed">
                        Manage system permissions, register/suspend IDs, audit
                        structural engine parsing, and trigger instant premium
                        mock data injections.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                    <Link href="/admin" className="w-full">
                        <Button
                            variant="outline"
                            className="w-full border-slate-300 hover:bg-slate-50 text-slate-700 font-medium flex items-center justify-center gap-2 group cursor-pointer">
                            Open Controls Panel
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </CardContent>
            </Card>
  )
}
