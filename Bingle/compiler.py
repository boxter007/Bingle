import os, sys, subprocess, tempfile, time
from BackGround import models
import logging
log = logging.getLogger("collect")
class compiler:
    code = ""
    codetype = "c"
    stdin = ""
    stdout = ""
    user = 0
    issue = 0

    def __init__(self,ctype,c,s,i,u):
        self.code = c
        self.codetype = ctype
        self.stdin = s
        self.issue = i
        self.user = u
    
    def run(self):
        outdata = ""
        #log.info(self.code)
        if self.codetype == "python":
            try:
                TempFile = tempfile.mkdtemp(suffix='_test', prefix='python_') 
                FileNum = "%d.py" % int(time.time() * 1000) 
                fpath = os.path.join(TempFile, FileNum) 
                with open(fpath, 'w', encoding='utf-8') as f: 
                    f.write(self.code) 
                outdata = subprocess.check_output([sys.executable, fpath,self.stdin], stderr=subprocess.STDOUT, timeout=50)
            except subprocess.CalledProcessError as e:
                outdata = e.output
        elif self.codetype == "text/x-go":
            try:
                TempFile = tempfile.mkdtemp(suffix='_test', prefix='go_') 
                FileNum = "%d.go" % int(time.time() * 1000) 
                fpath = os.path.join(TempFile, FileNum) 
                with open(fpath, 'w', encoding='utf-8') as f: 
                    f.write(self.code) 
                outdata = subprocess.check_output(["go","run", fpath , self.stdin], shell=False , stderr=subprocess.STDOUT, timeout=50)
            except subprocess.CalledProcessError as e:
                outdata = e.output
        elif self.codetype == "text/x-c++src":
            try:
                TempFile = tempfile.mkdtemp(suffix='_test', prefix='cpp_') 
                exefile = os.path.join(TempFile, "%d" % int(time.time() * 1000) ) 
                codefile = exefile + ".cpp"
                with open(codefile, 'w', encoding='utf-8') as f: 
                    f.write(self.code) 
                #编译
                subprocess.check_output(["g++", codefile,"-o",exefile], shell=False , stderr=subprocess.STDOUT, timeout=50)
                #授予权限
                subprocess.check_output(["chmod","+x",exefile], shell=False , stderr=subprocess.STDOUT, timeout=50)
                #执行
                outdata = subprocess.check_output([exefile, self.stdin], shell=False , stderr=subprocess.STDOUT, timeout=50)

            except subprocess.CalledProcessError as e:
                outdata = e.output
        elif self.codetype == "text/x-csrc":
            try:
                TempFile = tempfile.mkdtemp(suffix='_test', prefix='c_') 
                exefile = os.path.join(TempFile, "%d" % int(time.time() * 1000) ) 
                codefile = exefile + ".c"
                with open(codefile, 'w', encoding='utf-8') as f: 
                    f.write(self.code) 
                #编译
                subprocess.check_output(["gcc", codefile,"-o",exefile], shell=False , stderr=subprocess.STDOUT, timeout=50)
                #授予权限
                subprocess.check_output(["chmod","+x",exefile], shell=False , stderr=subprocess.STDOUT, timeout=50)
                #执行
                outdata = subprocess.check_output([exefile, self.stdin], shell=False , stderr=subprocess.STDOUT, timeout=50)

            except subprocess.CalledProcessError as e:
                outdata = e.output
        elif self.codetype == "text/x-ruby":
            try:
                TempFile = tempfile.mkdtemp(suffix='_test', prefix='rb_') 
                FileNum = "%d.rb" % int(time.time() * 1000) 
                fpath = os.path.join(TempFile, FileNum) 
                with open(fpath, 'w', encoding='utf-8') as f: 
                    f.write(self.code) 
                outdata = subprocess.check_output(["ruby", fpath , self.stdin], shell=False , stderr=subprocess.STDOUT, timeout=50)
            except subprocess.CalledProcessError as e:
                outdata = e.output
        elif self.codetype == "text/x-java":
            try:
                TempFile = tempfile.mkdtemp(suffix='_test', prefix='java_') 
                FileNum = "%d.java" % int(time.time() * 1000) 
                fpath = os.path.join(TempFile, FileNum) 
                with open(fpath, 'w', encoding='utf-8') as f: 
                    f.write(self.code) 
                outdata = subprocess.check_output(["java", fpath , self.stdin], shell=False , stderr=subprocess.STDOUT, timeout=50)
            except subprocess.CalledProcessError as e:
                outdata = e.output
        elif self.codetype == "text/x-perl":
            try:
                TempFile = tempfile.mkdtemp(suffix='_test', prefix='pl_') 
                FileNum = "%d.pl" % int(time.time() * 1000) 
                fpath = os.path.join(TempFile, FileNum) 
                with open(fpath, 'w', encoding='utf-8') as f: 
                    f.write(self.code) 
                outdata = subprocess.check_output(["perl", fpath , self.stdin], shell=False , stderr=subprocess.STDOUT, timeout=50)
            except subprocess.CalledProcessError as e:
                outdata = e.output
        elif self.codetype == "text/x-swift":
            try:
                TempFile = tempfile.mkdtemp(suffix='_test', prefix='swift_') 
                FileNum = "%d.swift" % int(time.time() * 1000) 
                fpath = os.path.join(TempFile, FileNum) 
                with open(fpath, 'w', encoding='utf-8') as f: 
                    f.write(self.code) 
                outdata = subprocess.check_output(["swift", fpath , self.stdin], shell=False , stderr=subprocess.STDOUT, timeout=50)
            except subprocess.CalledProcessError as e:
                outdata = e.output
        elif self.codetype == "text/x-csharp":
            try:
                TempFile = tempfile.mkdtemp(suffix='_test', prefix='cs_') 
                exefile = os.path.join(TempFile, "%d" % int(time.time() * 1000) ) 
                codefile = exefile + ".cs"
                with open(codefile, 'w', encoding='utf-8') as f: 
                    f.write(self.code) 
                #编译
                subprocess.check_output(["mcs", codefile,"-out:" + exefile], shell=False , stderr=subprocess.STDOUT, timeout=50)
                #执行
                outdata = subprocess.check_output(["mono" , exefile, self.stdin], shell=False , stderr=subprocess.STDOUT, timeout=50)

            except subprocess.CalledProcessError as e:
                outdata = e.output
        elif self.codetype == "text/x-fortran":
            try:
                TempFile = tempfile.mkdtemp(suffix='_test', prefix='f_') 
                exefile = os.path.join(TempFile, "%d" % int(time.time() * 1000) ) 
                codefile = exefile + ".f90"
                with open(codefile, 'w', encoding='utf-8') as f: 
                    f.write(self.code) 
                #编译
                subprocess.check_output(["gfortran", codefile,"-o",exefile], shell=False , stderr=subprocess.STDOUT, timeout=50)
                #授予权限
                subprocess.check_output(["chmod","+x",exefile], shell=False , stderr=subprocess.STDOUT, timeout=50)
                #执行
                outdata = subprocess.check_output([exefile, self.stdin], shell=False , stderr=subprocess.STDOUT, timeout=50)

            except subprocess.CalledProcessError as e:
                outdata = e.output
        elif self.codetype == "text/x-pascal":
            try:
                TempFile = tempfile.mkdtemp(suffix='_test', prefix='pas_') 
                exefile = os.path.join(TempFile, "%d" % int(time.time() * 1000) ) 
                codefile = exefile + ".pas"
                with open(codefile, 'w', encoding='utf-8') as f: 
                    f.write(self.code) 
                #编译
                subprocess.check_output(["fpc", codefile,"-o" + exefile], shell=False , stderr=subprocess.STDOUT, timeout=50)
                #授予权限
                subprocess.check_output(["chmod","+x",exefile], shell=False , stderr=subprocess.STDOUT, timeout=50)
                #执行
                outdata = subprocess.check_output([exefile, self.stdin], shell=False , stderr=subprocess.STDOUT, timeout=50)

            except subprocess.CalledProcessError as e:
                outdata = e.output
        elif self.codetype == "text/x-objectivec":
            try:
                TempFile = tempfile.mkdtemp(suffix='_test', prefix='m_') 
                exefile = os.path.join(TempFile, "%d" % int(time.time() * 1000) ) 
                codefile = exefile + ".m"
                with open(codefile, 'w', encoding='utf-8') as f: 
                    f.write(self.code) 
                #编译
                subprocess.check_output(["clang", codefile,"-o",exefile], shell=False , stderr=subprocess.STDOUT, timeout=50)
                #授予权限
                subprocess.check_output(["chmod","+x",exefile], shell=False , stderr=subprocess.STDOUT, timeout=50)
                #执行
                outdata = subprocess.check_output([exefile, self.stdin], shell=False , stderr=subprocess.STDOUT, timeout=50)

            except subprocess.CalledProcessError as e:
                outdata = e.output
        return outdata.decode('utf-8')

    def submit(self):
        issueobj = models.Issue.objects.filter(id=self.issue)
        totalcost = 0
        curcost = 0
        if(issueobj.exists()):
            curIssue = issueobj[0]
            submit = curIssue.Submit.objects.create(
                        codetype=self.codetype,
                        code = self.code,
                        user = models.User.objects.filter(id=self.user)[0],
                        cost = totalcost,
                        issue = curIssue)
            for check in curIssue.check_set.all():
                self.stdin = check.input
                checksubmit = self.equaloutput(check.output, self.run())
                log.info(checksubmit)
                curcost = curIssue.cost*check.percent/100 if checksubmit else 0 
                totalcost = totalcost + curcost
                curIssue.SubmitCheck.objects.create(
                        submitid = submit,
                        checkid = check,
                        ispass = checksubmit,
                        cost =  curcost)
            
            curIssue.Submit.objects.filter(id=submit.id).update(
                        cost = totalcost)                        
    
    def equaloutput(self,checkout,programout):
        return checkout.strip() == programout.strip()